/* ============================================
   Amiimu Gadgets - Cart Page JavaScript
   Uses standard HTML form submission via Formsubmit.co
   (No AJAX/fetch - avoids CORS/522 errors)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');
    const productPrice = urlParams.get('price');
    const productImage = urlParams.get('image');
    const orderSuccessParam = urlParams.get('success');

    const cartItemDisplay = document.getElementById('cartItemDisplay');
    const cartEmpty = document.getElementById('cartEmpty');
    const orderFormSection = document.getElementById('orderFormSection');
    const orderSuccess = document.getElementById('orderSuccess');

    // Check if returning after successful order submission
    if (orderSuccessParam === 'true') {
        orderSuccess.style.display = 'block';
        cartItemDisplay.style.display = 'none';
        cartEmpty.style.display = 'none';
        orderFormSection.style.display = 'none';
        return; // Stop here, just show success
    }

    // Set the _next redirect URL so Formsubmit.co sends user back here after submission
    var nextUrl = window.location.href.split('?')[0] + '?success=true';
    var formNextUrl = document.getElementById('formNextUrl');
    if (formNextUrl) {
        formNextUrl.value = nextUrl;
    }

    // Set product info from URL params
    if (productName && productPrice) {
        cartItemDisplay.style.display = 'flex';
        cartEmpty.style.display = 'none';

        document.getElementById('cartProductName').textContent = decodeURIComponent(productName);
        document.getElementById('cartProductPrice').textContent = formatPrice(productPrice);

        // Update product image if provided
        if (productImage) {
            document.getElementById('cartProductImage').src = decodeURIComponent(productImage);
        }

        // Pre-fill the form hidden and visible fields
        document.getElementById('formProductName').value = decodeURIComponent(productName);
        document.getElementById('formProductPrice').value = formatPrice(productPrice) + ' UGX';
        document.getElementById('formProductPriceDisplay').value = formatPrice(productPrice) + ' UGX';
    } else {
        cartItemDisplay.style.display = 'none';
        cartEmpty.style.display = 'block';
    }

    // Remove item button
    var removeBtn = document.getElementById('cartRemoveBtn');
    if (removeBtn) {
        removeBtn.addEventListener('click', function () {
            cartItemDisplay.style.display = 'none';
            cartEmpty.style.display = 'block';
            document.getElementById('formProductName').value = '';
            document.getElementById('formProductPrice').value = '';
            document.getElementById('formProductPriceDisplay').value = '';
        });
    }

    // Format price helper
    function formatPrice(price) {
        if (price === 'Contact Us' || price === 'Contact+Us' || isNaN(Number(price))) {
            return 'Contact Us';
        }
        return Number(price).toLocaleString() + ' UGX';
    }

});
