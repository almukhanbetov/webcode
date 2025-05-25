package models

type Category struct {
	ID       int        `json:"id"`
	Name     string     `json:"name"`
	Type     string     `json:"type"`
	ParentID *int       `json:"parent_id,omitempty"`
	Children []Category `json:"children,omitempty"`
}
