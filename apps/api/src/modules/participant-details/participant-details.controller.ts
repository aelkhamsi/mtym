import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, ParseIntPipe, Put, Req, ForbiddenException } from '@nestjs/common';
import { ParticipantDetailsService } from './participant-details.service';
import { CreateParticipantDetailsDto } from './dto/create-participant-details.dto';
import { UpdateParticipantDetailsDto } from './dto/update-participant-details.dto';
import { UserService } from '../user/services/user.service';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('mtym-api/participant-details')
export class ParticipantDetailsController {
  constructor(
    private readonly userService: UserService,
    private readonly participantDetailsService: ParticipantDetailsService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(200)
  async create(
    @Body() createParticipantDetailsDto: CreateParticipantDetailsDto,
    @Req() req,
  ) {
    const userId = req['user'].id;
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    let participantDetails = user?.participantDetails;
    if (participantDetails) {
      await this.participantDetailsService.update(participantDetails?.id, createParticipantDetailsDto);
    } else {
      participantDetails = await this.participantDetailsService.create(createParticipantDetailsDto, userId);
    }

    return {
      id: participantDetails.id,
      statusCode: 200,
    };
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.participantDetailsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantDetailsService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipantDetailsDto: UpdateParticipantDetailsDto,
    @Req() req,
  ) {
    const userId = req['user'].id;
    const participantDetails = await this.participantDetailsService.findOneById(id);
    const user = participantDetails?.user;
    if (user && user?.id !== userId) {
      throw new ForbiddenException('This user can not update this application');
    }

    const update = await this.participantDetailsService.update(id, updateParticipantDetailsDto);

    return {
      id: id,
      update: update,
      statusCode: 200,
    };
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.participantDetailsService.delete(id);
  }
}
