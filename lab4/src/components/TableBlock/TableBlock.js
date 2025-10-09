import React from 'react';
import './TableBlock.css';

function TableBlock() {
    return (
        <section className="table-block order-2">
            <h2 className="main-field-name">Таблица:</h2>
            <div className="main-field border-box">
                <h3 id="product-table-name">Таблица продуктивности</h3>
                <table id="product-table">
                <thead>
                    <tr>
                    <th>Название</th>
                    <th>Детали/час</th>
                    <th>Кол-во часов</th>
                    <th>Брак</th>
                    <th>Произведено</th>
                    <th>Итого</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="odd-row">
                    <td>№570-01</td>
                    <td>15</td>
                    <td>480</td>
                    <td>28</td>
                    <td>7172</td>
                    <td rowSpan="6">29 748</td>
                    </tr>
                    <tr className="even-row">
                    <td>№570-02</td>
                    <td>7.5</td>
                    <td>428</td>
                    <td>17</td>
                    <td>3193</td>
                    </tr>
                    <tr className="odd-row">
                    <td>№570-10</td>
                    <td>6</td>
                    <td>480</td>
                    <td>0</td>
                    <td>2880</td>
                    </tr>
                    <tr className="even-row">
                    <td>№571-02</td>
                    <td>15</td>
                    <td>720</td>
                    <td>1</td>
                    <td>10799</td>
                    </tr>
                    <tr className="odd-row">
                    <td>№580-02</td>
                    <td>40</td>
                    <td>120</td>
                    <td>72</td>
                    <td>4728</td>
                    </tr>
                    <tr className="even-row">
                    <td>№580-05</td>
                    <td>42</td>
                    <td>24</td>
                    <td>32</td>
                    <td>976</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </section>
    );
}

export default TableBlock;