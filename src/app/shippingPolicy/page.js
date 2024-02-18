import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import React from 'react'

const page = () => {
    return (
        <>
            <Navbar />
            <div className='flex justify-center items-center py-10'>
                <div className='flex flex-col gap-10'>
                    <h1 className='mb-4 text-lg font-bold'>*Shipping Policy for Zoobalo (Daily meal service):*</h1>

                    <div>
                        <h2>1. *Order Placement:*</h2>
                        <div>
                            <div> - Orders must be placed before 9.15 AM for lunch and 3.15 PM for dinner for next meal delivery.</div>
                            <div> - Customers can schedule recurring deliveries for convenience.</div>
                        </div>
                    </div>

                    <div>
                        <h2>2. *Delivery Area:*</h2>
                        <div>
                            <div> - We currently deliver to entire Udaipur.</div>
                            <div> - Check our website for an updated delivery zone.</div>
                        </div>
                    </div>

                    <div>
                        <h2>3. *Delivery Time:*</h2>
                        <div>
                            <div>- Deliveries are scheduled between 11.00 AM and 1 PM for lunch and for dinner its 6 PM to 7 PM.</div>
                            <div>  - Time slots are subject to availability and may vary by location.</div>
                        </div>
                    </div>

                    <div>
                        <h2>4. *Delivery Fee:*</h2>
                        <div>
                            <div>- A flat fee of 0/- applies to each delivery.</div>
                            <div> - Free delivery for all orders.</div>
                        </div>
                    </div>

                    <div>
                        <h2>5. *Special Instructions:*</h2>
                        <div>
                            <div> - Customers can provide delivery instructions during checkout.</div>
                            <div> - We'll do our best to accommodate specific requests.</div>
                        </div>
                    </div>

                    <div>
                        <h2>6. *Packaging:*</h2>
                        <div>
                            <div> - Meals are packaged securely to maintain freshness.</div>
                            <div> - Eco-friendly packaging options available upon request.</div>
                        </div>
                    </div>

                    <div>
                        <h2>7. *Cancellation and Modifications:*</h2>
                        <div>
                            <div> - Cancellations or modifications can be made 2 hours before delivery.</div>
                            <div> - Contact our customer support for assistance.</div>
                        </div>
                    </div>

                    <div>
                        <h2>8. *Missed Deliveries:*</h2>
                        <div>
                            <div> - If a customer is unavailable, we'll attempt to contact them.</div>
                            <div> - A redelivery fee may apply for unsuccessful attempts.</div>
                        </div>
                    </div>

                    <div>
                        <h2>9. *Quality Guarantee:*</h2>
                        <div>
                            <div> - We guarantee the quality and freshness of our meals upon delivery.</div>
                            <div> - Contact us within [timeframe] for any concerns or issues.</div>
                        </div>
                    </div>

                    <div>
                        <h2>10. *Holidays and Weekends:*</h2>
                        <div>
                            <div> - Special schedules may apply during holidays.</div>
                            <div> - Weekend deliveries may have limited time slots.</div>
                        </div>
                    </div>

                    <div>
                        <h2>11. *Communication:*</h2>
                        <div>
                            <div> - Customers receive real-time updates on their delivery status.</div>
                            <div>  - Our customer support is available for any assistance needed.</div>
                        </div>
                    </div>

                    <div>
                        <h2>12. *Terms and Conditions:*</h2>
                        <div>
                            <div>  - Customers are encouraged to review our full terms and conditions on our website.</div>
                            <div>   - By placing an order, customers agree to abide by our policies.</div>
                        </div>
                    </div>
                    <div className='mt-10'>We aim to provide a seamless and reliable meal delivery experience. Please feel free to contact us for any further inquiries or clarifications.</div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default page