document.addEventListener('DOMContentLoaded', () => {
    // ROI Calculator logic for index.html
    const revenueSlider = document.getElementById('revenue');
    const revenueText = document.getElementById('revenue-text');
    const marginSlider = document.getElementById('margin');
    const marginText = document.getElementById('margin-text');
    const painPointCheckboxes = document.querySelectorAll('input[name="pain-point"]');
    const roiValue = document.getElementById('roi-value');
    const roiInitial = document.getElementById('roi-initial');
    const roiFinal = document.getElementById('roi-final');

    if (revenueSlider && revenueText && marginSlider && marginText && roiValue && roiInitial && roiFinal) {
        const formatCurrency = (value) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        };

        const updateTextFields = () => {
            revenueText.value = formatCurrency(revenueSlider.value);
            marginText.value = `${marginSlider.value}%`;
        };

        const calculateROI = () => {
            const revenue = parseFloat(revenueSlider.value);
            const margin = parseFloat(marginSlider.value) / 100;
            const checkedPainPoints = document.querySelectorAll('input[name="pain-point"]:checked');

            if (checkedPainPoints.length === 0) {
                roiInitial.style.display = 'block';
                roiFinal.style.display = 'none';
                return;
            }

            const lossPerPainPoint = revenue * 0.025;
            const totalAnnualLoss = lossPerPainPoint * checkedPainPoints.length;
            const monthlyLoss = totalAnnualLoss / 12;

            roiValue.textContent = formatCurrency(monthlyLoss);
            roiInitial.style.display = 'none';
            roiFinal.style.display = 'block';
        };

        revenueSlider.addEventListener('input', () => {
            revenueText.value = formatCurrency(revenueSlider.value);
            calculateROI();
        });
        
        revenueText.addEventListener('change', () => {
            let value = parseFloat(revenueText.value.replace(/[^0-9.-]+/g,""));
            if (isNaN(value)) value = 500000;
            if (value < 50000) value = 50000;
            if (value > 2000000) value = 2000000;
            revenueSlider.value = value;
            revenueText.value = formatCurrency(value);
            calculateROI();
        });

        marginSlider.addEventListener('input', () => {
            marginText.value = `${marginSlider.value}%`;
            calculateROI();
        });
        
        marginText.addEventListener('change', () => {
            let value = parseInt(marginText.value.replace('%', ''));
            if (isNaN(value)) value = 15;
            if (value < 5) value = 5;
            if (value > 50) value = 50;
            marginSlider.value = value;
            marginText.value = `${value}%`;
            calculateROI();
        });

        painPointCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checkedCount = document.querySelectorAll('input[name="pain-point"]:checked').length;
                if (checkedCount > 3) {
                    checkbox.checked = false;
                }
                calculateROI();
            });
        });

        updateTextFields();
    }
});

// Expandable cards functionality for index.html
function toggleExpand(element) {
    const content = element.nextElementSibling;
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        element.textContent = "Show more";
    } else {
        content.classList.add('open');
        element.textContent = "Show less";
    }
}

function toggleMenu() {
    const navItems = document.getElementById('nav-items');
    navItems.classList.toggle('open');
}