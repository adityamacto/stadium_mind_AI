export default function StatsCard({ title, value }) {

    return (

        <div
            style={{
                background:"#162033",
                borderRadius:"16px",
                padding:"25px",
                border:"1px solid #24324b",
                boxShadow:"0 8px 20px rgba(0,0,0,.25)"
            }}
        >

            <p
                style={{
                    color:"#94a3b8",
                    fontSize:15
                }}
            >
                {title}
            </p>

            <h1
                style={{
                    marginTop:12,
                    fontSize:38,
                    color:"#38bdf8"
                }}
            >
                {value}
            </h1>

        </div>

    );

}