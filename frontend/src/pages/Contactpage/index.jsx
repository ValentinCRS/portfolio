import './index.css';

const Contactpage = () => {
  return (
    <div className="contact-page">
        <h1>Contactez-moi</h1>
        <form>
            <div>
                <label htmlFor="name">Nom:</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="subject">Sujet:</label>
                <input type="text" id="subject" name="subject" required />
            </div>
            <div>
                <label htmlFor="content">Message:</label>
                <textarea id="content" name="content" required></textarea>
            </div>
            <button type="submit">Envoyer</button>
        </form>
    </div>
  );
}
export default Contactpage;