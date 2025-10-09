import './MainContent.css';
import RefBlock from '../LinksBlock/LinksBlock';
import TableBlock from '../TableBlock/TableBlock';
import FormBlock from '../FormBlock/FormBlock';


function MainContent() {
    return (
        <main className="main-content">
            <TableBlock />
            <RefBlock />
            <FormBlock />
        </main>
    );
}

export default MainContent;