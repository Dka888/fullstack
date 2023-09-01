import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__item">
        <h3>Kontakt:</h3>
        <p>Tel: +48 794 698 119</p>
        <p>E-mail: dmitrijkosow@gmail.com</p>
        <p>Adres: ul. Krakowska 123, 00-000 Kraków</p>
      </div>
      <div className="footer__item">
            <h3>About company:</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Nisi vitae ipsam sed reprehenderit, aliquam ex,
              eligendi consectetur deserunt velit doloribus recusandae,
              labore reiciendis eaque distinctio autem obcaecati quod ipsum cum.</p>
      </div>
      <div className="footer__item">
            <h3>Policy:</h3>
        <ul>
              <li><a href="/" >Sending</a></li>
              <li><a href="/" >Complaint</a></li>
              <li><a href="/" >Private policy</a></li>
        </ul>
      </div>
    </footer>
  )
}