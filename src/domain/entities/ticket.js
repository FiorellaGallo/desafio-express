class Ticket
{
  constructor(props)
  {
      this._id = props.id;  
      this.code = props.code;
      this.purchaseDateTime = props.purchaseDateTime;
      this.amount = props.amount;
      this.purchaser = props.purchaser
      
  };
};

export default Ticket;