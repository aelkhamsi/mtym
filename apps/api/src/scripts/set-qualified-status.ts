import Datasource from 'db/typeorm.config'
import { Application } from 'src/modules/application/entities/application.entity'
import { ApplicationStatus } from 'src/modules/application/entities/application-status.entity'
import { TeamStatus } from 'src/modules/team/entities/team.entity'
import { DecisionEnum } from 'src/modules/team/entities/team-review.entity'

async function qualifyApplications() {
  const applicationRepo = Datasource.getRepository(Application)
  const applicationStatusRepo = Datasource.getRepository(ApplicationStatus)

  const applications = await applicationRepo
    .createQueryBuilder('application')
    .innerJoinAndSelect('application.status', 'status')
    .innerJoin('application.user', 'user')
    .innerJoin('user.team', 'team')
    .innerJoin('team.review', 'review')
    .where('status.status = :appStatus', { appStatus: 'VALIDATED' })
    .andWhere('team.status = :teamStatus', { teamStatus: TeamStatus.APPROVED })
    .andWhere('review.intermediateReportDecision = :decision', {
      decision: DecisionEnum.PASS,
    })
    .getMany()

  console.log(`Found ${applications.length} applications to qualify`)

  const statusIds = applications.map((app) => app.status.id)

  if (statusIds.length === 0) {
    console.log('Nothing to update')
    return
  }

  const result = await applicationStatusRepo
    .createQueryBuilder()
    .update(ApplicationStatus)
    .set({ status: 'QUALIFIED' })
    .whereInIds(statusIds)
    .execute()

  console.log(`Qualified ${result.affected}/${statusIds.length} applications`)
}

Datasource.initialize()
  .then(async () => {
    await qualifyApplications()
    await Datasource.destroy()
  })
  .catch((err) => console.error(err))