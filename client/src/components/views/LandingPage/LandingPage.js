import React from 'react'

import {API_KEY , API_URL , IMAGE_URL} from '../../Config'
import {Typography , Row} from 'antd'
import MainImage from './Sections/MainImage'
import GridCard from './Sections/GridCard'
const { Title } = Typography ; 

function LandingPage() {
    const [movies, setMovies] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    React.useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
             fetchMovies(endpoint)   
        
    }, [])
    const fetchMovies = (path)=>{
        fetch(path)
        .then(res=>res.json())
        .then(res =>
            {
                res.results && setMovies([...movies , ... res.results])
                setCurrentPage(res.page)
            })
    }
    const fetchMore =() =>
    {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`
        fetchMovies(endpoint) 
    }
    return (
        <div style={{width : '100%' , margin :0}}>
         {movies[0] && <MainImage 
         url={`${IMAGE_URL}w1280${movies[0].backdrop_path && movies[0].backdrop_path}`}
         title={movies[0].original_title}
         text={movies[0].overview}

         />}
           
                <div style={{width : '85%' ,margin:'1rem auto'}}>
                <Title level={2}>Movies by latest</Title>
                    <hr />
                    <Row gutter={[16,16]}>
                        {movies && movies.map((movie,id)=>{
                            return(
                                <React.Fragment key={movie.id}>
                                <GridCard 
                                image={`${IMAGE_URL}w500${movie.backdrop_path && movie.backdrop_path}`}
                                movieId={movie.id}  />
                                </React.Fragment>
                            )
                        })}
                    </Row>
                    <br />
                        <div style={{display:'flex',justifyContent : 'center'}}>
                        <button onClick={fetchMore}> Load More </button>

                        </div>
                 </div>
            </div>

        
    )
}

export default LandingPage
