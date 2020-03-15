import React from 'react'
import axios from 'axios'
import './favorites.css'
import {Button , Popover} from 'antd'
import {API_KEY , API_URL , IMAGE_URL} from '../../Config'

export default function Favorites() {
    const [FavoritesList, setFavoritesList] = React.useState([])
    const variable = {
        userFrom : localStorage.getItem('userId')
    }
   
    React.useEffect(() => {
        axios.get(`/api/favorites/${variable.userFrom}`)
                .then(
                    response =>
                    {
                        
                        if (response.data.success)
                        {   
                          setFavoritesList(response.data.favorites) 
                          
                        }
                        else 
                        {
                            alert('Query failed')
                        }
                    }
                )
    }, [])
    const handleClick = (variable)=>{
        
        axios.post('/api/favorites/removeFavorite',variable)
        
            .then(
                res=>
                {
                    
                    if(res.data.success)
                    {
                        setFavoritesList(FavoritesList.filter(item=>variable._id!==item._id))
                    }
                    else 
                    {
                        alert('failed to remove from favorites')
                    }
                }
            )
        
        }
    
    const renderTableBody = ()=>{
    
        return (
            FavoritesList.map((fav,id)=>{
               
                const content = (
                    <div>
                        {fav.movieImage ? <img src={`${IMAGE_URL}w500${fav.movieImage && fav.movieImage}`} alt={`${IMAGE_URL}w500${fav.moviePost && fav.moviePost}`}/> : "no Image"}
                    </div>
                )
                return(
                <tr key={id}>
                <Popover content={content} title={`${fav.movieTitle}`}>
                    <td>{fav.movieTitle}</td>
                    </Popover>
                    <td>{fav.movieRuntime} minutes</td>
                    <td><Button onClick={()=>handleClick(fav)}>Remove from favorites</Button></td>
                </tr>
            )})
        )
    }
    
    return (
        <div style={{width : '85%' , margin :'3rem auto'}}>
            <h3>My favorite Movies</h3>
            <hr />
            <table>
                <thead>
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <th>Remove from favorites</th>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>
        </div>
    )
}
