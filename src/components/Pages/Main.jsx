import { useEffect, useState } from 'react';
import NewsBanner from '../NewsBanner/NewsBanner.jsx';
import styles from './styles.module.css';
import { getCategories, getNews } from '../../api/apiNews';
import NewsList from '../NewsList/NewsList.jsx';
import Skeleton from '../Skeleton/Skeleton.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import Categories from '../Categories/Categories.jsx';
const Main = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = 10;
    const pageSize = 10;
    
    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true)
            const responce = await getNews({
                page_number: currentPage, 
                page_size: pageSize,
                category: selectedCategory === 'All' ? null : selectedCategory,
            })
            setNews(responce.news);
            setIsLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage, selectedCategory]);

    const fetchCategories = async () => {
        try {
            const responce = await getCategories();
            setCategories(["All", ...responce.categories]);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(categories);

    useEffect(() => {
        fetchCategories()
    }, []);

    // пагинация

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <main className={styles.main}>

            <Categories 
                categories={categories} 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />


            {news.length > 0 && !isLoading ? (
                <NewsBanner item={news[0]} />
            ) : (
                <Skeleton type={'banner'} count={1}/>
            )}

            <Pagination
                handleNextPage={handleNextPage} 
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                totalPages={totalPages}
                currentPage={currentPage}
            />

            {!isLoading ? 
                (<NewsList news={news}/>) 
            : 
                (<Skeleton type={"item"} count={10}/>)}

            <Pagination
                handleNextPage={handleNextPage} 
                handlePrevPage={handlePrevPage}
                handlePageClick={handlePageClick}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </main>
    )
}

export default Main;