import Feature from '../features/feature/Feature'
import { textsData } from '../datas/Texts'
import Customer from '../features/customer/customer'

const Homepage = () => {
    return (
        <main>
            <Customer />
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