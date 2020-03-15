import React from 'react'
import {API_KEY , API_URL , IMAGE_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import {Descriptions , Button , Row} from 'antd'
import GridCard from '../LandingPage/Sections/GridCard'
import Favorite from './Favorite'
function MovieDetailPage({match}) {
    const movieId = match.params.movieId ;
    const [movie, setMovie] = React.useState({})
    const [cast, setCast] = React.useState([])
    React.useEffect(() => {
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(
            res=>res.json()
        )
        .then(res=>{
            setMovie(res)
        
            fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
        .then(
            res=>res.json()
            
        )
        .then(res=>setCast(res.cast.filter(actor=>actor.profile_path!==null)))
        })
        
    }, [])
    const [showActors, setShowActors] = React.useState(false)
    const handleClick = ()=>{
                setShowActors( old => !old);
    }
    
    return (
        <div style={{width : '100%' , margin :0}}>
             {movie && <MainImage 
         url={`${IMAGE_URL}w1280${movie.backdrop_path && movie.backdrop_path}`}
         title={movie.original_title}
         text={movie.overview} /> }
         {/* Body */}
         <div style={{width : '85%' , margin : '1rem auto'}}>
             <div style={{display:'flex' , justifyContent:'flex-end'}}>
                 <Favorite userFrom = {localStorage.getItem('userId')} movieId={movieId} movieInfo={movie} />
             </div>
        
         {/*  Movie Info  */}
         <Descriptions title='Movie Info' bordered>
             <Descriptions.Item label="Title"> {movie.original_title} </Descriptions.Item>
             <Descriptions.Item label="release_date"> {movie.release_date} </Descriptions.Item>
             <Descriptions.Item label="revenue"> {movie.revenue} </Descriptions.Item>
             <Descriptions.Item label="runtime"> {movie.runtime} </Descriptions.Item>
             <Descriptions.Item label="vote_average"> {movie.vote_average} </Descriptions.Item>
             <Descriptions.Item label="vote_count"> {movie.vote_count} </Descriptions.Item>
             <Descriptions.Item label="status"> {movie.status} </Descriptions.Item>
             <Descriptions.Item label="popularity"> {movie.popularity} </Descriptions.Item>
         </Descriptions>
         <br />
         <div style={{display :'flex',justifyContent : 'center'}}>
         <Button onClick={handleClick}>{showActors ? "Hide" : "Show"} actors</Button>
         </div>
         <br />
         {showActors && <Row gutter={[16,16]}>
                        {cast && cast.map((actor,id)=>{
                            return(
                                <React.Fragment key={actor.id}>
                                <GridCard 
                                actor={true}
                                image={`${IMAGE_URL}w500${actor.profile_path && actor.profile_path}`}
                                actorId={actor.id}  />
                                </React.Fragment>
                            )
                        })}
                    </Row>}
                    </div>
         
        </div>
    )
}

export default MovieDetailPage
