export class RingEvent{

    event_id: string;
    event_type: string;
    event_answered: string;
    event_created_at: Date;

    constructor(
        event_id: string,
        event_type: string,
        event_answered: string,
        event_created_at: Date
    ) { 
        this.event_id = event_id;
        this.event_type = event_type;
        this.event_answered = event_answered;
        this.event_created_at = event_created_at;

    }
  }
