import DataSource from 'db/typeorm.config'
import { Team } from 'src/modules/team/entities/team.entity';
import { TeamReview } from 'src/modules/team/entities/team-review.entity';

async function seedTeamReviews() {
  const teamRepo = DataSource.getRepository(Team);
  const reviewRepo = DataSource.getRepository(TeamReview);

  const teams = await teamRepo.find();

  for (const team of teams) {
    const existing = await reviewRepo.findOne({ where: { team: { id: team.id } } });
    if (existing) continue;
    const review = reviewRepo.create({
      team,
      reviewerId: null,
      intermediateReportScore: null,
      intermediateReportDecision: null,
      comment: null,
    });
    await reviewRepo.save(review);
  }

  console.log(`Seeded reviews for ${teams.length} teams.`);
}

DataSource.initialize()
  .then(async () => {
    await seedTeamReviews();
    await DataSource.destroy();
  })
  .catch((err) => console.error(err));