import Feature from '../features/feature/Feature'
import { textsData } from '../datas/Texts'
import { customerData } from '../datas/Customer'
import Customer from '../features/customer/Customer'

const Homepage = () => {
    return (
        <main>
            {customerData.map((text, index) => (
                <Customer 
                    key={index}  // Add a key for each element
                    title={text.title}
                    subtitleOne={text.subtitleOne}
                    subtitleTwo={text.subtitleTwo}
                    subtitleThree={text.subtitleThree}
                    text={text.text}
                /> 
            ))}
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {textsData.map((text, index) => {
                    return (
                        <Feature
                            key={index}
                            src={text.src}
                            title={text.title}
                            desc={text.description}
                        />
                    )
                })}
            </section>
        </main>
    )
}

export default Homepage