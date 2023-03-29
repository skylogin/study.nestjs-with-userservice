import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private scheduleRegistry: SchedulerRegistry) {
    this.addCronJob();
  }

  addCronJob() {
    const name = 'cronSample';

    const job = new CronJob('* * * * * *', () => {
      this.logger.warn(`run! ${name}`);
    });

    this.scheduleRegistry.addCronJob(name, job);
    this.logger.warn(`job ${name} added!`);
  }

  // @Cron('* * * * * *', { name: 'cronTask ' })
  // handleCron() {
  //   this.logger.log('Task Called');
  // }

  // @Cron(new Date(Date.now() + 3 * 1000))
  // handleCronOnce() {
  //   this.logger.log('RUN ONCE ');
  // }

  // @Interval('intervalTask', 3000)
  // handleInterval() {
  //   this.logger.log('Task Called by interval');
  // }

  // @Timeout('timeoutTask', 5000)
  // handleTimeout() {
  //   this.logger.log('Task Called by timeout');
  // }
}
