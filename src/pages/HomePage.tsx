import FreeFeedBox from "../components/FreeFeedBox";
import Masthead from "../components/Masthead";
import QrPaymentPanel from "../components/QrPaymentPanel";

export default function HomePage() {
  return (
    <div className="page home-page">
      <Masthead />
      <main>
        <section className="left" aria-labelledby="page-title">
          <div>
            <p className="kicker">Thông báo hoàn toàn nghiêm túc</p>
            <h1 id="page-title">Hai cách<br />nuôi Tanh.</h1>
            <p className="lead">
              Một cách không tốn tiền. Một cách khiến ứng dụng ngân hàng hơi bận.
            </p>
          </div>
          <FreeFeedBox />
        </section>
        <QrPaymentPanel />
      </main>
    </div>
  );
}
