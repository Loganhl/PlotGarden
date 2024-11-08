import numpy as np
import matplotlib.pyplot as plt
from grab_calc import get_crop_counts, get_crops_info, get_garden_dimensions
import colorsys
import os
import matplotlib.patheffects as path_effects

def create_garden_plot(garden_id):
    # Crop information: name and dimensions (width, height).
    crops_info = get_crops_info(garden_id)
    print(crops_info)

    # Total counts based on your specifications.
    crop_counts = get_crop_counts(garden_id)
    print(crop_counts)

    # Garden dimensions.
    garden_dimensions = get_garden_dimensions(garden_id)
    if garden_dimensions:
        garden_len, garden_wid = garden_dimensions
        garden = np.full((garden_len, garden_wid), '', dtype=object)

    # Function to generate pastel colors.
    def generate_pastel_color(index, total_crops):
        hue = index / total_crops
        lightness = 0.8 
        saturation = 0.5
        r, g, b = colorsys.hls_to_rgb(hue, lightness, saturation)
        return (r, g, b)

    # Generate colors for each crop.
    crop_colors = {crop: generate_pastel_color(i, len(crop_counts)) for i, crop in enumerate(crop_counts.keys())}

    # Function to fill the garden with crops.
    def fill_garden():
        sorted_crops = sorted(crop_counts.items(), key=lambda x: crops_info[x[0]], reverse=True)

        def place_crop(crop, crop_width, crop_height):
            for r in range(garden_len):
                for c in range(garden_wid):
                    if (r + crop_height <= garden_len and c + crop_width <= garden_wid and
                        all(garden[r + h][c + w] == '' for h in range(crop_height) for w in range(crop_width))):
                        for h in range(crop_height):
                            for w in range(crop_width):
                                garden[r + h][c + w] = crop
                        return True
                    if (r + crop_width <= garden_len and c + crop_height <= garden_wid and
                        all(garden[r + h][c + w] == '' for h in range(crop_width) for w in range(crop_height))):
                        for h in range(crop_width):
                            for w in range(crop_height):
                                garden[r + h][c + w] = crop
                        return True
            return False

        # Fill the garden with the crops.
        for crop, count in sorted_crops:
            crop_width, crop_height = crops_info[crop]
            for _ in range(count):
                placed = place_crop(crop, crop_width, crop_height)
                if not placed:
                    print(f"Could not place {crop} after trying.")

        # Attempt to fill remaining empty spaces iteratively.
        def fill_empty_spaces():
            filled = True
            while filled:
                filled = False
                for crop, count in sorted_crops:
                    crop_width, crop_height = crops_info[crop]
                    for _ in range(count):
                        if place_crop(crop, crop_width, crop_height):
                            filled = True
                        elif place_crop(crop, crop_height, crop_width):
                            filled = True

        fill_empty_spaces()

    # Fill the garden.
    fill_garden()

    # Function to plot the garden.
    def plot_garden(garden_plot, garden_id):
        fig, ax = plt.subplots(figsize=(10, 5))
        ax.set_xlim(0, garden_plot.shape[1])
        ax.set_ylim(0, garden_plot.shape[0])
        ax.set_facecolor('black')  # Set background to black

        for r in range(garden_plot.shape[0]):
            for c in range(garden_plot.shape[1]):
                crop = garden_plot[r, c]
                if crop:
                    color = crop_colors[crop] 
                    ax.add_patch(plt.Rectangle((c, garden_plot.shape[0] - r - 1), 1, 1, facecolor=color, edgecolor='none'))

                    # Outline effect around the text
                    text = ax.text(c + 0.5, garden_plot.shape[0] - r - 0.5, crop.capitalize(), ha='center', va='center', fontsize=8, color='white')
                    text.set_path_effects([path_effects.withStroke(linewidth=2, foreground='black')])  # Outline in black

        ax.set_xticks(np.arange(0, garden_plot.shape[1] + 1, 1))
        ax.set_yticks(np.arange(0, garden_plot.shape[0] + 1, 1))
        ax.grid(True, color='white')  # Change grid color to white

        # Set the tick labels to white
        ax.tick_params(axis='both', colors='white')

        plt.gca().set_aspect('equal', adjustable='box')

        # Create directory if it does not exist
        output_dir = 'frontend/src/plotpng'
        os.makedirs(output_dir, exist_ok=True)

        plt.savefig(os.path.join(output_dir, f'{garden_id}.png'), transparent=True, bbox_inches='tight', pad_inches=0)
        plt.close(fig) 

    # Call the function to plot the garden and save the PNG
    plot_garden(garden, garden_id)

# This function can be called from another file with garden_id as an argument
