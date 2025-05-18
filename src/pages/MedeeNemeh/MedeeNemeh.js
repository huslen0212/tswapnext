import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import NewsPhoto from '../../components/NewsPhoto'
import styles from "../MedeeNemeh/MedeeNemeh.module.css"
export default function MedeeNemeh()
{ return (
    <div className="pageContainer">
      <AdminHeader/>
       <section className={styles.NewsForm}>
          <h1 className={styles.garchig}>Хайх тасалбараа нэмнэ үү:</h1>
          <NewsPhoto/>
       <div className={styles.field}>
        <label className={styles.label}>
            Мэдээний гарчиг:
        </label>
          <input 
          type ="text"
          name="title"
          placeholder="Оруулах мэдээний гарчигаа бичнэ үү..."
          className={styles.input}>
          </input>
       </div>
       <div className={styles.field}>
        <label className={styles.label}>
            Мэдээний хураангуй:
        </label>
          <input 
          type ="text"
          name="title"
          placeholder="Энд бичнэ үү..."
          className={styles.inputSummary}>
          </input>
       </div>
       <div className={styles.field}>
        <label className={styles.label}>
            Мэдээний дэлгэрэнгүй:
        </label>
          <input 
          type ="text"
          name="title"
          placeholder="Энд бичнэ үү..."
          className={styles.inputContent}>
          </input>
       </div>
       <div className={styles.field}>
        <label className={styles.label}>
            Нийтлэгч:
        </label>
          <input 
          type ="text"
          name="title"
          placeholder="Энд бичнэ үү..."
          className={styles.input}>
          </input>
       </div>
          <button className={styles.submitButton}>
            Мэдээ нэмэх
          </button>
       </section> 
      <Footer />
    </div>
  );
}