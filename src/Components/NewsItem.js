import React from 'react'

const NewsItem = (props)=> {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <>
                <div className="card">
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: "0"
                    }}>
                        <span className=" badge rounded-pill bg-danger" >{source}</span>
                    </div>

                    <img src={!imageUrl ? "https://storage.googleapis.com/afs-prod/media/290c6a2f515a4d10b90c7e9476761096/3000.webp" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </>
        )
    
}
export default NewsItem