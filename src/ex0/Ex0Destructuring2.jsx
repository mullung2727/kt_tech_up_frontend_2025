function Book({title, author, year}) {
    return (
        <h1>{title}는 {author}가 썼고, {year}에 출간되었습니다.</h1>
    )
}

export default function BookList() {
    return (
        <>
            <Book title="해리포터" author="J.K 롤링" year={1997} />
            <Book title="어린왕자" author="생텍쥐페리" year={1943} />
        </>

    )
}