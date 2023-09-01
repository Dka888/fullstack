import './About.scss';

export const About = () => {
    return (
        <section className="about">
            <h2 className='about__title'>About Us</h2>
            <article className='about__text'>
                <div></div>
                <div>
                    <img src='/images/phoneAndCard.jpg' alt='phoneAndCard' className='about__picture' style={{float: 'left', width: '20%'}}/>
                    
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat est, laboriosam repellat modi cupiditate quibusdam, doloremque molestias magni incidunt quia facilis illo at ipsam consequuntur beatae nemo magnam animi officia!
                        Minima error assumenda enim deleniti. 
                    </p>
                    <img src='./images/user.jpg' alt='user' className='about__picture' style={{float: 'right', width: '30%'}}/>
                    <p>
                        Non aliquam ad veritatis laborum illo, sapiente possimus magnam dolore eveniet quaerat, ipsum fugit ex repellat blanditiis eaque quasi totam! Dignissimos, minus culpa. Quis, excepturi.
                        Nulla ullam neque atque. Odio, nulla. Excepturi, cupiditate sapiente? Temporibus facilis dolor, rerum quis, blanditiis dicta nulla odit vitae inventore repellat suscipit, laborum pariatur molestiae reprehenderit eum consequatur impedit sequi.
                        Rerum officiis sunt illo! At, earum accusantium aliquam doloremque pariatur nostrum officia. 
                        Dignissimos facere accusantium, odio modi amet, ipsum animi veritatis reprehenderit perferendis quasi corrupti necessitatibus repellat eveniet quam omnis possimus! At, sunt quod?
                        Id assumenda officia sunt repudiandae delectus commodi, libero, illum repellat ullam velit quia enim et nesciunt aliquid aut! Eos unde natus, sit porro perspiciatis sapiente pariatur id tempore culpa aliquam!
                    </p>
                </div>

                <div></div>
            </article>
        </section>
    )
}