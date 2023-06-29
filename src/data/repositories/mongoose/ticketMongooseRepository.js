import { ticketModel } from "../../model/ticket.model.js";
import Ticket from "../../../domain/entities/ticket.js";

class TicketMongooseRepository{
    
    async create(ticket){
        
        const document = await ticketModel.create(ticket);

        return new Ticket({
            id: document._id,
            code: document.code,
            purchaseDateTime: document.purchaseDateTime,
            amount: document.amount,
            purchaser: document.purchaser
            
        })


    }
}

export default TicketMongooseRepository;