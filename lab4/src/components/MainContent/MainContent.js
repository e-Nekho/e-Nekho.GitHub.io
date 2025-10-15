import './MainContent.css';
import RefBlock from '../LinksBlock/LinksBlock';
import TableBlock from '../TableBlock/TableBlock';
import FormBlock from '../FormBlock/FormBlock';


function MainContent() {
    return (
        <main className="main-content">
            <div className="main-content-container">
                <TableBlock />
                <RefBlock />
                <FormBlock />
            </div>
        </main>
    );
}

export default MainContent;