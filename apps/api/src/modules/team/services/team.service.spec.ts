import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamService } from './team.service';

/**
 * The repository is faked with an in-memory array so the test exercises the
 * real uniqueness logic (including the SQL-side UPPER() comparison, replayed
 * here in JS) instead of a mock that always answers "not found".
 */
const buildService = (existingTeams: { id: number; quadrigram: string; name: string }[]) => {
  let lookedUpQuadrigram = '';

  const queryBuilder = {
    where: (_clause: string, params: { quadrigram: string }) => {
      lookedUpQuadrigram = params.quadrigram;
      return queryBuilder;
    },
    getOne: async () =>
      existingTeams.find(
        (team) =>
          team.quadrigram.toUpperCase() === lookedUpQuadrigram.toUpperCase(),
      ) ?? null,
  };

  const teamRepository = {
    createQueryBuilder: () => queryBuilder,
    find: async () => existingTeams,
    create: (partial: any) => ({ ...partial }),
    save: async (team: any) => team,
  };

  const userService = { findOneById: async (id: number) => ({ id }) };

  return new TeamService(
    userService as any,
    teamRepository as any,
    {} as any,
    {} as any,
  );
};

const asDto = (body: Record<string, string>) =>
  plainToInstance(CreateTeamDto, body);

describe('TeamService quadrigram uniqueness', () => {
  it('rejects a lowercase duplicate of an existing uppercase quadrigram', async () => {
    const service = buildService([
      { id: 1, quadrigram: 'MARP', name: 'The Moroccan Pi-oneers' },
    ]);

    await expect(
      service.create(
        asDto({ name: 'Another team', slogan: 'Slogan', quadrigram: 'marp' }),
        42,
      ),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejects an uppercase duplicate of an existing lowercase quadrigram', async () => {
    const service = buildService([
      { id: 1, quadrigram: 'marp', name: 'The Moroccan Pi-oneers' },
    ]);

    await expect(
      service.create(
        asDto({ name: 'Another team', slogan: 'Slogan', quadrigram: 'MARP' }),
        42,
      ),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('rejects a mixed-case, untrimmed duplicate', async () => {
    const service = buildService([
      { id: 1, quadrigram: 'MARP', name: 'The Moroccan Pi-oneers' },
    ]);

    await expect(
      service.create(
        asDto({ name: 'Another team', slogan: 'Slogan', quadrigram: '  MaRp ' }),
        42,
      ),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('stores the quadrigram upper-cased so later comparisons agree', async () => {
    const service = buildService([]);

    const team = await service.create(
      asDto({ name: 'New team', slogan: 'Slogan', quadrigram: 'marp' }),
      42,
    );

    expect(team.quadrigram).toBe('MARP');
  });

  it('still accepts a genuinely free quadrigram', async () => {
    const service = buildService([
      { id: 1, quadrigram: 'MARP', name: 'The Moroccan Pi-oneers' },
    ]);

    const team = await service.create(
      asDto({ name: 'New team', slogan: 'Slogan', quadrigram: 'abcd' }),
      42,
    );

    expect(team.quadrigram).toBe('ABCD');
  });

  it('rejects a case-insensitive duplicate on update too', async () => {
    const service = buildService([
      { id: 1, quadrigram: 'MARP', name: 'The Moroccan Pi-oneers' },
      { id: 2, quadrigram: 'ABCD', name: 'Another team' },
    ]);
    (service as any).teamRepository.findOne = async ({ where }: any) => ({
      id: where.id,
    });

    await expect(
      service.update(2, asDto({ quadrigram: 'marp' }) as any),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
