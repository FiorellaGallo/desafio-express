import container from '../../container.js';

class TicketManager{

    constructor(){
        this.ticketRepository = container.resolve('TicketRepository');
    };

    async create(data){
        
        return await this.ticketRepository.create(data)
    };
};

export default TicketManager;



