// Gọi API lấy dữ liệu sản phẩm
async function loadProducts() {
	try {
		const response = await fetch("https://api.escuelajs.co/api/v1/products");
		const data = await response.json(); // data là 1 mảng JSON

		// Chuyển dữ liệu JSON thành object JS (thực ra đã là object rồi)
		// Sau đó render ra màn hình
		renderProducts(data);
	} catch (error) {
		console.error("Lỗi khi gọi API:", error);
	}
}

// Hàm hiển thị danh sách sản phẩm ra HTML
function renderProducts(products) {
	const container = document.getElementById("products");
	if (!container) {
		console.warn("Không tìm thấy thẻ có id='products'");
		return;
	}

	container.innerHTML = ""; // Xóa nội dung cũ nếu có

	products.forEach((item) => {
		const card = document.createElement("div");
		card.className = "product-card";

		card.innerHTML = `
			<img src="${item.images?.[0] || ""}" alt="${item.title}" class="product-image" />
			<h3 class="product-title">${item.title}</h3>
			<p class="product-price">$${item.price}</p>
			<p class="product-description">${item.description}</p>
		`;

		container.appendChild(card);
	});
}

// Gọi hàm khi trang load xong
window.addEventListener("DOMContentLoaded", loadProducts);

