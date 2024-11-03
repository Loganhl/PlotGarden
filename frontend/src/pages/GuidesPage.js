
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (i=0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
}

function SoilGuidePage(){
    return(
        <div className="guide-page">
            <h1>Plant Guide</h1>
            <div className="slideshow">
                <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                <div className="slides fade">
                    <div class="info">
                        <h3>Starting your first garden!</h3>
                        <hr />
                            <p>Congratulations on deciding to create your first garden! Growing your own garden can be a rewarding experience, providing fresh produce, enjoyable activities, and quality time with loved ones.
                            <br /><br/>With PlotGarden's support, we're here to guide you every step of the way. Let’s break down how to choose your garden's location and size. Aim for a minimum size of 10 x 10 feet, or about 75-100 square feet.
                            Once you have the size figured out, focus on selecting a good location for your garden. Here are some key points to consider
                            <ul>
                                <li>Soil Quality: Ensure your garden is placed in an area with suitable soil. Most plants thrive in loamy soil, but some may need specific types. Check our crop library for soil recommendations for different plants.</li>
                                <br />
                                <li>Water Drainage: Choose a spot that drains well. Avoid areas where water tends to pool after rain. If your garden is in a low spot, consider raised beds to improve drainage.</li>
                                <br/>
                                <li>Slope and Runoff: Assess the slope of your garden. A gentle slope aids drainage, while a steep slope can cause runoff and erosion. For sloped areas, think about terracing or using retaining walls to slow down water flow and keep soil in place.</li>
                                <br/>
                                <li>Erosion Control: Use ground covers or cover crops to help prevent soil erosion. Mulching is also effective; it protects the soil from heavy rain and wind while retaining moisture.</li>
                                <br/>
                                <li>Water Access: Ensure your garden is near a water source for easy irrigation. Think about how you’ll water your plants—whether using a hose, watering can, or an irrigation system.</li>
                                <br/>
                                <li>Sunlight and Wind Protection: Consider how much sunlight your garden will receive and if any nearby structures or trees can provide shelter from strong winds, which can affect your plants.</li>
                            </ul>
                            By keeping these factors in mind, you’ll create a healthy, productive garden that can thrive for years to come. Happy gardening!</p>
                    </div>
                </div>

                <div className="slides fade">
                    <div class="info">
                        <h3>Selecting Your Crops!</h3>
                        <hr />
                        <p>Choosing the right crops is a crucial step in creating a successful garden. Here are some important factors to consider:
                            <ul>
                                <li>Nutrient Density: Aim to select crops that provide high nutritional value. Nutrient-dense vegetables, such as kale, spinach, and broccoli, offer essential vitamins and minerals that contribute to a healthy diet. Our website provides a list of recommended crops that are not only tasty but also packed with nutrients, helping you make the most of your garden space.</li>
                                <br />
                                <li>Hardiness Zone: Understanding your hardiness zone is essential for selecting crops that will thrive in your climate. The hardiness zone indicates the average minimum winter temperature in your area, guiding you in choosing plants that can survive local conditions. Our site will assess your garden's location to determine its hardiness zone and suggest crops that are well-suited to that environment.</li>
                                <br />
                                <li>Size of Crops: Consider the size of the crops you want to grow. Some plants require more space than others; for instance, tomatoes and peppers need more room to spread out, while lettuce and radishes can fit more closely together. When you select crops through our form, our website will generate a detailed plot of your garden, including recommended locations and size measurements for each crop. This ensures efficient use of space and helps you visualize how everything will fit together.</li>
                            </ul>
                            By considering nutrient density, hardiness zone, and crop size, you'll be well on your way to selecting a variety of plants that not only flourish in your garden but also provide you with a bountiful harvest. For more guidance, visit Texas A&M AgriLife Extension's Easy Gardening Series (https://aggie-horticulture.tamu.edu/vegetable/easy-gardening-series/) for additional resources and tips.
                            </p>
                    </div>
                </div>

                <div className="slides fade">
                    <div class="info">
                        <h3>How to Maintain Your Garden!</h3>
                        <hr />
                        <p>Maintaining your garden is essential for ensuring healthy plants and a fruitful harvest. Here are the key aspects of garden maintenance to keep in mind:
                            <ul>
                                <li>Watering: Proper watering is crucial for plant health. Different crops have varying water requirements, and it's important to provide the right amount to prevent over- or under-watering. When you select your crops through our website, we’ll provide specific watering needs for each type, helping you create a consistent watering schedule. Generally, most gardens benefit from deep watering once a week, adjusting based on rainfall and plant needs.</li>
                                <br />
                                <li>Pest Management: Keeping your garden free from pests is vital to protect your plants. Monitor for signs of infestation, such as chewed leaves or discoloration. Our site will equip you with pest management tips specific to your chosen crops, including organic methods and preventive measures. Regular inspections and prompt action can save your plants from serious damage.</li>
                                <br />
                                <li>Harvesting: Knowing when to harvest your crops is essential for enjoying the best flavors and nutritional benefits. Each plant has a specific harvest season and growth rate. When you select your crops, our website will provide information on when to harvest and what to expect as they grow. Make sure to check your garden regularly for ripe produce and enjoy the fruits of your labor!</li>
                            </ul>
                            Additionally, to assist you in maintaining your garden, our website assigns a maintenance difficulty value to each crop: 1 for easy, 2 for moderate, and 3 for hard. This way, you can choose plants that fit your experience level and available time. You can view all of this information in your PlotGarden menu or in the crop library, ensuring you have all the details you need at your fingertips.
                            <br /><br />By staying on top of watering, pest management, and harvesting, you’ll create a thriving garden that rewards your efforts with fresh, delicious produce. Happy gardening!
                        </p>
                    </div>
                </div>


                <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>
            <br></br>
            <div style={{textAlign: 'center'}}>
                <span className="dot" onClick={() => currentSlide(1)}></span>
                <span className="dot" onClick={() => currentSlide(2)}></span>
                <span className="dot" onClick={() => currentSlide(3)}></span>
            </div>
        </div>
    )
}

export default SoilGuidePage;