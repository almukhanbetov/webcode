package handlers

import (
	"context"
	"net/http"
	"webcode/internal/db"
	"webcode/internal/models"

	"github.com/gin-gonic/gin"
)

func GetCategoriesTree(c *gin.Context) {
	rows, err := db.DB.Query(context.Background(), "SELECT id, name, type, parent_id FROM categories")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка загрузки категорий"})
		return
	}
	defer rows.Close()

	catMap := make(map[int]*models.Category)
	var roots []models.Category

	for rows.Next() {
		var cat models.Category
		err := rows.Scan(&cat.ID, &cat.Name, &cat.Type, &cat.ParentID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка парсинга"})
			return
		}
		catMap[cat.ID] = &cat
	}

	for _, cat := range catMap {
		if cat.ParentID == nil {
			roots = append(roots, *cat)
		} else {
			parent := catMap[*cat.ParentID]
			parent.Children = append(parent.Children, *cat)
		}
	}

	c.JSON(http.StatusOK, roots)
}

func CreateCategory(c *gin.Context) {
	var input struct {
		Name     string `json:"name" binding:"required"`
		Type     string `json:"type" binding:"required"`
		ParentID *int   `json:"parent_id"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Неверные данные"})
		return
	}

	query := `INSERT INTO categories (name, type, parent_id) VALUES ($1, $2, $3) RETURNING id`
	var id int
	err := db.DB.QueryRow(context.Background(), query, input.Name, input.Type, input.ParentID).Scan(&id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка добавления"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"id": id, "message": "Категория создана"})
}
