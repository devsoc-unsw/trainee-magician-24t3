
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

    return (

        <div className={styles.gridCardWrapper}>
            <div className={styles.gridCardContainer}>
                <div className={styles.gridCardTitle}>
                    <h1>{title}</h1>
                </div>
                <div className={styles.gridCardTags}>
                    <TipTags tags={tags} />
                </div>
                <div className={styles.gridCardContent}>
                    <p>{description}</p>
                </div>
                <div className={styles.gridCardRating}>
                    <CommunityRating rating={rating} showText={false} />
                </div>
            </div>

            <div className={styles.BackgroundBlock}></div>
        </div>

    );
};

export default GridCard;
