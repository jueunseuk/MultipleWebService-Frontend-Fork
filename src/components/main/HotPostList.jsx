import styled from "styled-components";
import HotPostItem from "./HotPostItem";
import { useEffect, useState } from "react";
import { selectedCategoryState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const HotPostList = () => {
    // 파이어 베이스에서 데이터 불러와서 배열로 저장
    const [firePosts, setFirePosts] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedCategory, setSelectedCatogory] = useRecoilState(selectedCategoryState);

    // db에서 불러오기
    const fetchPosts = async () => {
        try{
            const postsCollection = collection(db, "posts");
            let postsQuery;

            if (selectedCategory === "전체") {
                postsQuery = postsCollection;
            } else {
                postsQuery = query(postsCollection, where("post_category", "==", selectedCategory));
            }
            const querySnapshot = await getDocs(postsQuery);

            const resultposts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter(post => new Date(post.post_deadline) > new Date());

            setFirePosts(resultposts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const topPosts = [...firePosts]
                        .sort((a, b) => b.post_interest - a.post_interest)
                        .slice(0, 10);

        setSortedData(topPosts);
    },[firePosts]);

    useEffect(() => {
        fetchPosts();
    }, [selectedCategory]);

    return (
        <>
            <Wrapper>
                {sortedData.map((post, index) => (
                    <HotPostItem key={index} post={post} />
                ))}
            </Wrapper>
        </>
    );
}

export default HotPostList;

// styled components

const Wrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 372px;
    height: 185px;
    margin: 15px 0 0 18px;

    &::-webkit-scrollbar{
        display: none;
    }
`;
