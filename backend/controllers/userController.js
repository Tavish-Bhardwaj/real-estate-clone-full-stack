import asyncHandler from 'express-async-handler'
import {prisma} from "../config/prismaconfig.js"
export const createUser= asyncHandler(async(req,res)=>{
    console.log("creating a user");

    let {email}= req.body;
    
    const userExists= await prisma.user.findUnique({where: {email}})
  if(!userExists){

    const user= await prisma.user.create({data: req.body})
    res.send({
        message: "user registered successfully",
        user: user,
    })
  }
  else res.status(201).send({message: "user already exists"})


})


// function to book a visit to resd

export const bookVisit= asyncHandler(async(req,res)=>{
const {email,date}  =req.body;
const {id} = req.params;

try {
  const alreadyBooked = await prisma.user.findUnique({
    where: {email}, 
    select: {bookedVisits: true}
  })
  
  if(alreadyBooked.bookedVisits.some((visit)=>visit.id === id)) {
    res.status(400).json({message: "You have already booked this visit"})
  }
  else{
    await prisma.user.update({
      where: {email},
      data:{
        bookedVisits:{push:{id, date}}
      }
    })
    res.send("Visit booked successfully")
  }
} catch (error) {
  throw new Error(error.message)
  
}
})


// function to get all bookings of the user
export const  allBookings= asyncHandler(async(req,res)=>{
  const {email}= req.body;
  try {
    const Bookings= await prisma.user.findUnique({
      where: {email},
      select: {bookedVisits: true}
    })
    res.status(200).send(Bookings)
  } catch (error) {
    throw new Error(error.message)
  }
})

// function to cancel a booking
export const cancelBooking= asyncHandler(async(req,res)=>{
const {email} = req.body;
const {id} = req.params;
try {
  
const user = await prisma.user.findUnique({
  where: {email},
  select: {bookedVisits: true}
})

const index = user.bookedVisits.findIndex((visit)=>visit.id === id)

if(index === -1){
  res.status(404).json({message: "booking not found"})
}else{
  user.bookedVisits.splice(index, 1)
  await prisma.user.update({
    where: {email},
    data: {
      bookedVisits: user.bookedVisits
    }
  })
  res.send("booking cancelled successfully")

}

} catch (error) {
  throw new Error(error.message);
}
})


// function to add a residency in favourite list of a user

export const toFav= asyncHandler(async(req,res)=> {
  const {email}= req.body;
  const {rid}= req.params;

  try {
    const user= await prisma.user.findUnique({
      where: {email},
      
    })
    

    if(user.favResidenciesID.includes(rid)){
      const updatedUser= await prisma.user.update({
        where: {email},
        data: {
          favResidenciesID: {set:user.favResidenciesID.filter((id)=>id !== rid)}
        }
      })
      res.send({message:"residency removed from favourites", user: updatedUser})
    }
    else{
      const updatedUser= await prisma.user.update({
        where: {email},
        data: {
          favResidenciesID: {push: rid}
        }
      })
      res.send({message:"residency added to favourites", user: updatedUser})
    }
  } catch (error) {
    throw new Error(error.message);
    
  }
})


// function to get all favourites
 export const getAllFav= asyncHandler(async(req,res)=>{
const {email}= req.body;
try {
  const favResd= await prisma.user.findUnique({
    where: {email},
    select: {favResidenciesID: true}
  })
  res.status(200).send(favResd);
} catch (error) {
  throw new Error(error.message);
}
 })