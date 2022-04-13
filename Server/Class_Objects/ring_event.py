class Ring_Event:
    # TODO Add additional information for devcie
    def __init__(self, event_id, event_type, event_answered, event_created_at):
        self.event_id = event_id
        self.event_type = event_type
        self.event_answered = event_answered
        self.event_created_at = event_created_at

    def return_event(self):
        return self

    def encoded_event(self):
        return {'event_id': self.event_id, 'event_type': self.event_type, 'event_answered': self.event_answered, 
        'even_created_at': self.event_created_at}
