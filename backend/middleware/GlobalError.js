export const globalErrorHandler = (err,req,res,next)=>{

    res.status(err.status|| 500).send({message:   err.message || "Something went Wrong!"      })
}