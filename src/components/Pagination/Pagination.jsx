import { formatDate } from "../../helpers/formatDate";

import styles from './styles.module.css';

const Pagination = ( { 
        totalPages, 
        handleNextPage, 
        handlePrevPage, 
        handlePageClick, 
        currentPage } ) => {
    return (
        <div className={styles.pagination}>
            <button 
                disabled={currentPage <= 1}
                onClick={handlePrevPage}
                className={styles.arrow}>{'<'}</button>

            <div className={styles.list}>
                {[...Array(totalPages)].map((_, index) => {
                    return <button
                            onClick={() => handlePageClick(index + 1)}
                            key={index}
                            disabled={(index + 1) === currentPage}
                            className={styles.pageNumber}>
                                {index + 1}
                        </button>
                })}
            </div>

            <button
                disabled={currentPage >= totalPages}
                onClick={handleNextPage}
                className={styles.arrow}>{'>'}</button>
        </div>
    )
}

export default Pagination;