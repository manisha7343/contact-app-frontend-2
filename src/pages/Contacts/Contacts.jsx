import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Contacts.module.css";

import ContactSearch from "../../components/Contacts/ContactSearch";
import ContactList from "../../components/Contacts/ContactList";
import ContactPagination from "../../components/Contacts/ContactPagination";
import ContactEditModal from "../../components/Contacts/ContactEditModal";
import ContactDeleteConfirm from "../../components/Contacts/ContactDeleteConfirm";

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/contacts?page=${page}&search=${searchInput}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await response.json();

        if (data.success) {
          setContacts(data.data || []);
          setTotalPages(data.totalPages);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [navigate, page, searchInput]);


  // ⭐ FUNCTION 1: Favorite Toggle Karne Ke Liye
  const handleToggleFavorite = async (contact) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3001/api/contacts/${contact._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...contact,
          isFavorite: !contact.isFavorite, // Toggle value
        }),
      });

      const data = await response.json();

      if (data.success || data.sucess) {
        toast.success(contact.isFavorite ? "Removed from favorites" : "Added to favorites");
        // Frontend state update karo turant color change dekhne ke liye
        setContacts((prev) =>
          prev.map((c) => (c._id === contact._id ? { ...c, isFavorite: !c.isFavorite } : c))
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating favorite status: " + error.message);
    }
  };


  // 🗑️ FUNCTION 2: Soft Delete Ke Liye (isDeleted: true)
  const handleSoftDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3001/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isDeleted: true, // Backend logic ke liye true pass kiya
        }),
      });

      const data = await response.json();

      if (data.success || data.sucess) {
        toast.success("Contact deleted successfully");
        setContacts((prev) => prev.filter((c) => c._id !== id));
        setContactToDelete(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting contact: " + error.message);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleRequestDelete = (contact) => {
    setContactToDelete(contact);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      handleSoftDelete(contactToDelete._id);
    }
  };

  const handleCancelDelete = () => {
    setContactToDelete(null);
  };

  const handleUpdateContact = (updatedContact) => {
    setContacts((prev) =>
      prev.map((c) => (c._id === updatedContact._id ? updatedContact : c))
    );
    setEditingContact(null);
  };

  return (
    <>
      {/* ------ search Input & Create Button --------- */}
      <ContactSearch
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onCreateContact={() => setShowCreateModal(true)}
      />

      {/* ----------conatcts list ------------- */}
      <ContactList 
        contacts={contacts} 
        loading={loading} 
        styles={styles} 
        onToggleFavorite={handleToggleFavorite} // Pass function to list
        onDeleteContact={handleRequestDelete}     // Open confirm modal
        onEditContact={handleEditContact}
      />

      {editingContact && (
        <ContactEditModal
          contact={editingContact}
          onClose={() => setEditingContact(null)}
          onSave={handleUpdateContact}
        />
      )}

      {showCreateModal && (
        <ContactEditModal
          contact={null}
          onClose={() => setShowCreateModal(false)}
          onSave={(newContact) => {
            setContacts((prev) => [newContact, ...prev]);
            setShowCreateModal(false);
          }}
        />
      )}

      {contactToDelete && (
        <ContactDeleteConfirm
          contact={contactToDelete}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* ----- Bootstrap Pagination ----------------------- */}
      <ContactPagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  );
}

export default Contacts;