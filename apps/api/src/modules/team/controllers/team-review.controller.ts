import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { TeamReviewService } from '../services/team-review.service';
import { CreateTeamReviewDto } from '../dto/create-team-review.dto';
import { UpdateTeamReviewDto } from '../dto/update-team-review.dto';

@Controller('mtym-api/teams/review')
export class TeamReviewController {
  constructor(private readonly teamReviewService: TeamReviewService) {}

  @Post()
  create(@Body() dto: CreateTeamReviewDto) {
    return this.teamReviewService.create(dto);
  }

  @Get()
  findAll() {
    return this.teamReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamReviewService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTeamReviewDto,
  ) {
    return this.teamReviewService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamReviewService.remove(id);
  }
}