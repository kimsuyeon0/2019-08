import {Notifier} from "../notifier/notifier";
import {Invite} from "../../domain/entity/Invite";
import {Email} from "../../domain/vo/Email";
import {Snug} from "../../domain/entity/Snug";
import {User} from "../../domain/entity/User";
import _ from "lodash";

export class Inviter {
  private emailNotifier: Notifier<Invite>;
  private alarmNotifier: Notifier<Invite>;

  constructor(emailNotifier: Notifier<Invite>, alarmNotifier: Notifier<Invite>) {
    this.emailNotifier = emailNotifier;
    this.alarmNotifier = alarmNotifier;
  }

  async invite(snugId: string, emails: string[]): Promise<Invite[]> {
    const snug = await Snug.findOne(snugId);
    const signedInvitees = await User.findByEmails(emails);
    const unsignedInvitees = _.differenceWith(emails, signedInvitees, (email, user) => user.hasSameEmail(email))
            .map(email => new Email(email))
            .map(email => new User(email));

    const invitationsForSignedPeople = this.makeInvitations(signedInvitees, snug);
    const invitationsForUnsignedPeople = this.makeInvitations(unsignedInvitees, snug);
    const invitations = _.union(invitationsForSignedPeople, invitationsForUnsignedPeople);
    const invitationsToNotifier = await Invite.save(invitations);

    this.emailNotifier.send(invitationsToNotifier);
    this.alarmNotifier.send(invitationsForSignedPeople);
    return invitations;
  }

  private makeInvitations(users: User[], snug: Snug): Invite[] {
    return _.map(users, (user) => new Invite(user, snug));
  }
}