const {initializeDatabase} = require("./db/db.connect")

const express = require("express")

const app = express();

app.use(express.json())

const Hotel = require("./models/hotel.models")

const cors = require("cors")
app.use(cors());

initializeDatabase();

// const newHotel = {
//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
// };

  async function createHotel(newHotel){
     try{
        const hotel = new Hotel(newHotel)
        const saveHotel = await hotel.save();
        return saveHotel
    }
    catch(error){throw error}
  }

  // createHotel(newHotel)

  app.post("/hotels", async (req, res) => {
    try{
      const savedHotel = await createHotel(req.body)
      res.status(201).json({message: "Hotel added successfully", hotel: savedHotel})
    }
    catch(error){
      res.status(500).json({error: "An error while adding the hotel.", error})
    }
  })

async function readAllHotels(){
  try{
    const allHotels = await Hotel.find()
    return allHotels
} catch(error) {throw error}
}

// readAllHotels()

app.get("/hotels", async (req, res) => {
  try{
    const hotels = await readAllHotels()
    if(hotels.length  != 0){
      res.json(hotels)
    }else{
      res.status(404).json({error: "Hotels not found."})
    }
  }
  catch(error){
    res.status(500).json({error: "Error while fetching data."})
  }
})

// Read hotel by name

async function readHotelByName(hotelName){
  try{
    const hotelByName = await Hotel.findOne({name: hotelName})
    return hotelByName
  }catch(error){throw error}
}

// readHotelByName("Lake View")

app.get("/hotels/:hotelName", async (req, res) => {
  try{
    const hotel = await readHotelByName(req.params.hotelName)
    if(!hotel){
      res.status(404).json({error: "Hotel not found."})
    }
    else{
      res.json(hotel)
    }
  }
  catch(error){
    res.status(500).json({error: "An error occured while fetching the data."})
  }
})

// Read hotels with parking space

// async function readHotelWithParkingSpace(parkingCheck){
//   try{
//     const hotelsWithParking = await Hotel.find({isParkingAvailable: parkingCheck})
//     console.log(hotelsWithParking)
//   }
//   catch(error){throw error}
// }

// readHotelWithParkingSpace(true)

// Read all hotels by category Midrange

async function readHotelsWithcategory(categoryCheck){
  try{
    const hotelsWithcategory = await Hotel.find({category: categoryCheck})
    return hotelsWithcategory
  }
  catch(error){throw error}
}

// readHotelsWithcategory("Mid-Range")

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try{
    const hotels = await readHotelsWithcategory(req.params.hotelCategory)
    if(hotels.length !=0){
      res.json(hotels)
    }else{
      res.status(404).json({error: "No hotel found."})
    }
  }
  catch(error){
    res.status(500).json({error: "An error occured while fetching data."})
  }
})

// Read hotels with price range

// async function readHotelsWithPricerange(price){
//   try{
//     const hotelWithinPrice = await Hotel.find({priceRange: price})
//     console.log(hotelWithinPrice)
//   }
//   catch(error){}
// }

// readHotelsWithPricerange("$$$$ (61+)")

//all hotels with 4.0 star rating

async function readHotelsWithRating(ratingCheck) {
  try{
    const hotelWithRatings = await Hotel.find({rating: ratingCheck})
    return hotelWithRatings
  }
  catch(error){throw error}
  
}

// readHotelsWithRating(4.0)

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try{
    const hotels = await readHotelsWithRating(req.params.hotelRating)
    if(hotels.length != 0){
      res.json(hotels)
    }else{
     
      res.status(404).json({error: "No hotel found."})
    }
  }
  catch(error){
    res.status(500).json({error: "An error occured while fetching data."})
  }
})

//hotel with phone number

async function readHotelWithPhoneNumber(phone) {
  try{
    const hotelWithNumber = await Hotel.findOne({phoneNumber: phone})
    return hotelWithNumber
  }
  catch(error){throw error}
  
}

// readHotelWithPhoneNumber("+1299655890")

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try{
    const hotel = await readHotelWithPhoneNumber(req.params.phoneNumber)
    if(!hotel){
      res.status(404).json({error: "Hotel not found."})
    }
    else{
      res.json(hotel)
    }
  }
  catch(error){
    res.status(500).json({error: "An error occured while fetching data."})
  }
})

//find byId and Update

async function updateByHotelId(hotelId, datatoUpdate){
  try{
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, datatoUpdate, {new: true})
    return updatedHotel
  }
  catch(error){throw error}
}

// updateByHotelId('67bc96de2e045b039e2e423e', {checkOutTime: "11:00 AM"})

app.post("/hotels/:hotelId", async(req, res) => {
  try{
    const updatedHotel = await updateByHotelId(req.params.hotelId, req.body)
    if(updatedHotel){
      res.status(200).json({message: "Hotel updated successfully"})
    }
    else{
      res.status(404).json({error: "Hotel not found."})
    }
  }
  catch(error){
    res.status(500).json({error: "An error occured while updating hotel."})
  }
})

// find by name and update

// async function updateByHotelName(hotelName, datatoUpdate){
//   try{
//     const updatedHotel = await Hotel.findOneAndUpdate({name: hotelName}, datatoUpdate, {new:true})
//     console.log(updatedHotel)
//   }
//   catch(error){throw error}
// }

// updateByHotelName("Sunset Resort", {rating: 4.2} )

// find by phone and update

async function updateHotelByPhone(phone, datatoUpdate){
  try{
    const updatedHotel = await Hotel.findOneAndUpdate({phoneNumber: phone}, datatoUpdate, {new:true})
    console.log(updatedHotel)
  }
  catch(error){throw error}
}

// updateHotelByPhone("+1299655890", {phoneNumber: '+1997687392'})


async function deleteHotelById(hotelId){
  try{
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId)
    return deletedHotel
  }
  catch(error){throw error}
}

// deleteHotelByid("67bc9712ee74fcc2a1c7f4ee")

app.delete("/hotels/:hotelId", async (req, res) => {
  try{
    const deleteHotel = await deleteHotelById(req.params.hotelId)
    if(deleteHotel){
      res.status(200).json({message: "Hotel deleted successfully."})
    }
  }
  catch(error){
    res.status(500).json({error: "An error occured while deleting the hotel."})
  }
})


async function deleteHotelByPhoneNumber(phone){
  try{
    const deletedHotel = await Hotel.findOneAndDelete({phoneNumber: phone})
    console.log(deletedHotel)
  }
  catch(error){throw error}
}

// deleteHotelByPhoneNumber("+1234555890")

const PORT=6000
app.listen(PORT, () => {
  console.log("Server is running on" , PORT)
})