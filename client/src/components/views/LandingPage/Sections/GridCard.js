import React from 'react'
import {Col } from 'antd'
export default function GridCard({movieId,image,actor,actorId}) {
    const ActorShit = ()=>{
                return (
                    <Col  lg={6} md={8} xs={24}>
    <div style={{position : 'relative'}}>
        
            <img style={{ width : '100%' , height : '320px'}} alt={"img"} src={image} />
        
    </div>
</Col>
                )
    }
    if ( actor )
    return (
        <React.Fragment>
                      {image!==null && <ActorShit />  }   
        </React.Fragment>
        
     )
    return (
       <Col  lg={6} md={8} xs={24}>
            <div style={{position : 'relative'}}>
                <a href={`/movie/${movieId}`}>
                    <img style={{ width : '100%' , height : '320px'}} alt={"img"} src={image} />
                </a>
            </div>
       </Col>
    )
}
