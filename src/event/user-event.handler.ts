import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailService } from 'src/email/email.service';
import { TestEvent } from './test.event';
import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent, TestEvent)
export class UserEventHandler
  implements IEventHandler<UserCreatedEvent | TestEvent>
{
  constructor(private emailService: EmailService) {}

  async handle(event: UserCreatedEvent | TestEvent) {
    switch (event.name) {
      case UserCreatedEvent.name: {
        console.log('UserCreatedEvent!');
        const { email, signupVerifyToken } = event as UserCreatedEvent;
        console.log(email, signupVerifyToken);
        console.log('send email!!!!! complete');
        // await this.emailService.sendMemberJoinVerification(
        //   email,
        //   signupVerifyToken,
        // );
        break;
      }
      case TestEvent.name: {
        console.log('TestEvent!');
        break;
      }
      default:
        break;
    }
  }
}
