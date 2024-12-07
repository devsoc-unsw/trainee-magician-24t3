interface DateProps {
    date: Date;
};

const Date = (props: DateProps) => {
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    }).format(props.date);
    
    return (
        <div>
            <h3>{formattedDate}</h3>
        </div>
    );
};
  
export default Date;
