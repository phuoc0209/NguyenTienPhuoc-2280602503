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

// Hàm hiển thị danh sách sản phẩm ra bảng HTML
function renderProducts(products) {
	const tbody = document.getElementById("products-body");
	if (!tbody) {
		console.warn("Không tìm thấy thẻ có id='products-body'");
		return;
	}

	tbody.innerHTML = ""; // Xóa nội dung cũ nếu có

	products.forEach((item, index) => {
		const tr = document.createElement("tr");

		// Tạo slug đơn giản từ title
		const slug = (item.title || "")
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)+/g, "");

		const imageUrl = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : "";
		const categoryName = item.category && item.category.name ? item.category.name : "";

		tr.innerHTML = `
			<td class="col-index">${index + 1}</td>
			<td>${item.title || ""}</td>
			<td class="slug">${slug}</td>
			<td class="col-price">$${item.price ?? ""}</td>
			<td>${item.description || ""}</td>
			<td>${categoryName}</td>
			<td class="col-image">
				${imageUrl ? `<img src="${imageUrl}" alt="${item.title}" class="thumb" />` : ""}
			</td>
		`;

		tbody.appendChild(tr);
	});
}

// Gọi hàm khi trang load xong
window.addEventListener("DOMContentLoaded", loadProducts);

