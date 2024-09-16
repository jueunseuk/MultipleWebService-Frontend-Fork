import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backbutton from "/assets/Icon/navigate_before.svg";
import NavigationUser from "../../components/main/NavigationUser";
import InterestMoreItem from "../../components/user/InterestMoreItem";
import data from "../../hotPostData.json"
import SortFilter from "../../components/main/SortFilter";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { selectedSortState } from "../../recoil/atoms";

const UserInterestMoreList = () => {
    const [sort, setSort] = useRecoilState(selectedSortState);
    const [sortedData, setSortedData] = useState(data);

    useEffect(() => {
        let sortedArray = [...data];
        if (sort === "최신순") {
            sortedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === "시간임박순") {
            sortedArray.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if (sort === "인원임박순") {
            sortedArray.sort((a, b) => {
                let subA = a.maxParticipants - a.currentParticipants;
                let subB = b.maxParticipants - b.currentParticipants;
                return subA - subB;
            });
        }
        setSortedData(sortedArray);
    }, [sort]);

    const navigate = useNavigate();

    const handleIntroNavigate = () => {
        navigate(-1);
    }

    return (
        <>
            <Wrapper>
                <Header>
                    <BackButton onClick={handleIntroNavigate}/>
                    <Title>찜한 게시글</Title>
                </Header>
                <FilterWrapper>
                    <SortFilter />
                </FilterWrapper>
                <InterestList>
                    {sortedData.map((post, index) => (
                        <InterestMoreItem post={post} key={index} />
                    ))}
                </InterestList>
            </Wrapper>
            <NavigationUser />
        </>
    );
}

export default UserInterestMoreList;

// styled components

const Wrapper = styled.div`
    font-family: "Pretendard-Medium";
    width: 390px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    margin-bottom: 90px;
`

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 52px;
`;

const BackButton = styled.img.attrs({
    src: backbutton,
    alt: "Back Button"
})`
    width: 24px;
    height: 24px;
    margin-left: 10px;

    &:hover{
        cursor: pointer;
    }
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
    margin-left: 125px;
`;

const FilterWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 3px;
    margin-right: 3px;
`;

const InterestList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    width: 100%;
`;
