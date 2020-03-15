import React from 'react'
import {Button} from 'antd'
import axios from 'axios'
import { set } from 'mongoose'

export default function Favorite(props) {
    const [FavoriteNumber, setFavoriteNumber] = React.useState(0)
    const [favored, setFavored] = React.useState(false)
  
    const variable ={
        userFrom : props.userFrom ,
        movieTitle : props.movieInfo.original_title ,
        movieImage : props.movieInfo.backdrop_path ,
        movieId : props.movieId , 
        movieRuntime : props.movieInfo.runtime ,
        

}
    React.useEffect(() => {
        
                axios.post('/api/favorites/favoriteNumber',variable)
                .then(
                    response =>
                    {
                        
                        if (response.data.success)
                        {   
                          setFavoriteNumber(response.data.favoriteNumber)
                          

                        }
                        else 
                        {
                            alert('Failed to get favorite Number')
                        }
                    }
                )
                axios.post('/api/favorites/favored',variable)
                .then(
                    response =>
                    {
                        
                        if (response.data.success)
                        {   
                          setFavored(response.data.favored)
                          

                        }
                        else 
                        {
                            alert('Query failed')
                        }
                    }
                )
    }, [])
    const handleClick = ()=>{
        
        if (!favored)
        {
            
            axios.post('/api/favorites/addToFavorites',variable)
            .then(
                res=>
                {
                    
                    if(res.data.success)
                    {
                        
                        setFavored(true)
                        setFavoriteNumber(prev=> prev + 1)
                        
                    }
                    else 
                    {
                        alert('failed to add to favorites')
                    }
                }
            )
        }
        else{
            
            axios.post(`/api/favorites/removeFavorite`,variable)
            .then(
                res=>
                {
                    
                    if(res.data.success)
                    {
                        setFavored(false)
                        setFavoriteNumber(prev=> prev - 1)
                    }
                    else 
                    {
                        alert('failed to remove from favorites')
                    }
                }
            )
        }
    }
    return (
        <div>
            <Button onClick={handleClick}> {favored ? 'Remove from' : 'Add to'}  favorites {FavoriteNumber} </Button>
        </div>
    )
}
