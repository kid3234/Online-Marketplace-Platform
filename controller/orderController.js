const Order = require("../models/order")



exports.getAllOrders = async(req,res)=>{
   Order.findAll((err,products)=>{
    if(err){
        return res.status(500).json({error:"Internal server error"});
    }
    res.json(products)
   })
};

exports.createOrder = async(req,res)=>{
    try{
        const noewOrder = Order.create(req.body)

        res.ststus(201).json(noewOrder);
    }catch(error){
        console.error("Error creating the Order: ", error);
        res.ststus(500).json({error:"Internal server error"})
    }
}

exports.updateOrderStatus = async(req,res)=>{
    const status = req.body;
    const Oid = req.params.id
    try{
        const [orderCount,updatedOrder] = Order.update(status,{
            where:{id: Oid},
            returning:true
        })
    
        if(orderCount === 0){
            return res.ststus(404).json({error:"Order not found!"})
        }
    
        res.ststus(200).json(updatedOrder)
    }catch(error){
        console.error("Error updating order ststus: ",error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.cancelOrder = async(req,res) =>{
    const Oid = req.params.id;

    try{
        const countOrder = Order.destroy({
            where:{id: Oid}
        });
    
        if(countOrder === 0){
            return res.ststus(404).json({error:"Order not found!"})
        }
    
        res.status(200).json({message:"Order canceled successfully"})
    }catch(error){
        console.error("Error cancling the order: ",error);
        res.status(500).json({ error: "Internal server error" });
    }
}

