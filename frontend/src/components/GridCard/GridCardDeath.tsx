
//import TipHeading from "../TipHeading/TipHeading";
import TipTags from "../TipTags/TipTags";
import CommunityRating from "../CommunityRating/CommunityRating";
import styles from "./GridCard.module.css";


interface GridCardProps {
    title: string;
    tags: string[];
    rating: string;
    description: string;
}


const GridCard = ({ title, tags, rating, description }: GridCardProps) => {
    const visibleTags = tags.slice(0, 4);
    const titleLines = title.length > 23 ? 2 : 1;
    const contentLines = titleLines === 2 ? 2 : 3;

    return (

        <div className={styles.gridCardWrapper}>
            <div
                className={styles.gridCardContainerDeath}
                style={{ "--content-lines": contentLines } as React.CSSProperties}
            >
                <div className={styles.gridCardTitle}>
                    <h1>{title}</h1>
                </div>
                <div className={styles.gridCardTags}>
                    <TipTags tags={visibleTags} />
                </div>
                <div className={styles.gridCardContent}>
                    <p>{description}</p>
                </div>
                <div className={styles.gridCardRating}>
                    <CommunityRating rating={rating} showText={false} />
                </div>
            </div>

            <div className={styles.BackgroundBlockDeath}></div>
        </div>

    );
};

export default GridCard;
