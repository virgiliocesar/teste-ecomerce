import blogsData from "../../data/blogs.json"

const Blogs = () => {
    return (
        <section className="section__container blog__container" id="blog">
            <h2 className="section__header">Novidades do Blog</h2>
            <p className="section__subheader " style= {{marginBottom: '3rem' }}>Eleve seu guarda-roupa com nossas dicas de estilo mais frescas, tendências e inspiração em nosso blog.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {
                    blogsData.map((blog, index) => (
                        <div key={index} className="blog__card cursor-pointer hover:scale-105 transition-all duration-300">
                            <img src={blog.imageUrl} alt={blog.title} />
                            <div className="blog__card__content">
                                <h6>{blog.subtitle}</h6>
                                <h4>{blog.title}</h4>
                                <p>{blog.date}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Blogs