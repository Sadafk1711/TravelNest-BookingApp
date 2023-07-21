import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setextraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(10000);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setextraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description) {
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData ={
            title, address, addedPhotos, 
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests, price,
        };
        if (id){
            //update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            //New Place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
        
    }

    if(redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <AccountNav />
                    <form onSubmit={savePlace}>
                        {preInput('Title', 'Give your place a name')}
                        <input 
                            type="text" 
                            value={title} 
                            onChange={ev =>setTitle(ev.target.value)} 
                            placeholder="Title, for example: My Apartment" />

                        {preInput('Address', 'Where is your place located?')}
                        <input 
                            type="text" 
                            value={address} 
                            onChange={ev =>setAddress(ev.target.value)} 
                            placeholder="Address" />

                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">Add photos of your place</p>
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                        {preInput('Description','Describe your place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>

                        {preInput('Perks','Select all the perks that your place has')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:gri-cols-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra Info','House Rules,etc')}
                        <textarea value={extraInfo} onChange={ev => setextraInfo(ev.target.value)}/>
                        {preInput('Check In & Out Time','Add Check In and Out Time')}
                        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                            <div>
                                <h3 className="mt-2 -mb-1">Check In Time</h3>
                                <input 
                                    type="text" 
                                    value={checkIn} 
                                    onChange={ev =>setCheckIn(ev.target.value)} 
                                    placeholder="14:00" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                                <input 
                                    type="text" 
                                    value={checkOut} 
                                    onChange={ev =>setCheckOut(ev.target.value)} 
                                    placeholder="18:00" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
                                <input 
                                    type="number" 
                                    value={maxGuests} 
                                    onChange={ev=>setMaxGuests(ev.target.value)} />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Price per night</h3>
                                <input 
                                    type="number" 
                                    value={price} 
                                    onChange={ev=>setPrice(ev.target.value)} />
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                        
                    </form>    
                </div>
    );
}