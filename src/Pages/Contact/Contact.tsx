import { Button } from '../../component/button/Button';
import './Contact.scss';

export const Contact = () => {

  const handleSendMsg = () => {

  };
    return (
        <section className='contact-section'>
            <h2 className='contact__title'>Contact</h2>

            <form
            className="form"
            id="form"
            action=""
          >
            <div className="form__item">
              <label htmlFor="name" className="form__label"></label>
              <input
                type="text"
                placeholder="Name"
                className="form__input"
                id="name"
                required
              />
            </div>

            <div className="form__item">
              <label htmlFor="email" className="form__label"></label>
              <input
                type="email"
                placeholder="Email"
                className="form__input"
                id="email"
                required
              />
            </div>

            <div className="form__item">
              <label htmlFor="message" className="form__label"></label>
              <textarea
                placeholder="Message"
                className="form__textarea"
                rows={4}
                id="message"
                required
              ></textarea>
            </div>
            <Button name='send' action={handleSendMsg} />
          </form>

             <address className="contact">
              <div className="contact__phone">
                <p className="contact__text--normal">Phone</p>
                <a
                  className="contact__link"
                  href="tel:+48 234 567 891"
                >
                  <p className="contact__text--bold">+48 123 456 789</p>
                </a>
              </div>
              <div className="contact__address">
                <p className="contact__text--normal">Address</p>
                <a
                  href="/"
                  target="_blank"
                  className="contact__link"
                >
                  <p className="contact__text--bold">
                  ul. Krakowska 123,<br/> 00-000 Kraków
                  </p>
                </a>

              </div>
            </address>
        </section>
    )
}